// components/CategoryPicker.tsx
import { useState, useMemo } from "react";
import { Category } from "@/models";
import {
  Combobox,
  useCombobox,
  TextInput,
  Text,
  Box,
  UnstyledButton,
  Flex,
  ScrollArea,
} from "@mantine/core";
import {
  IconChevronRight,
  IconChevronDown,
  IconSearch,
} from "@tabler/icons-react";

interface CategoryPickerProps {
  label?: string;
  placeholder?: string;
  nothingFoundMessage?: string;
  categories: Category[];
  onSelect: (
    value: string | undefined,
    option: { value: string | undefined; label: string }
  ) => void;
}

export default function CategoryPicker({
  label = "Select category",
  placeholder = "Pick a category",
  nothingFoundMessage = "No categories found",
  categories = [],
  onSelect,
}: CategoryPickerProps) {
  const comboboxStore = useCombobox();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (category: Category) => {
    if (!category.categories || category.categories.length === 0) {
      setSelectedCategory(category);
      onSelect(category.url, { value: category.url, label: category.name });
      setSearchTerm("");
      comboboxStore.closeDropdown();
    }
  };

  // Filter categories based on the search term
  const filteredCategories = useMemo(() => {
    const filterCategories = (categories: Category[]): Category[] => {
      return categories
        .map((category) => {
          const hasChildren =
            category.categories && category.categories.length > 0;

          // Check if the category name includes the search term
          const nameMatches = category.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          // Recursively filter children
          let filteredChildren: Category[] = [];
          if (hasChildren) {
            filteredChildren = filterCategories(category.categories!);
          }

          // Include the category if the name matches or if any children match
          if (nameMatches || filteredChildren.length > 0) {
            return {
              ...category,
              categories: filteredChildren,
            };
          }

          // Exclude the category
          return null;
        })
        .filter((category) => category !== null) as Category[];
    };

    if (!searchTerm) {
      return categories;
    }

    return filterCategories(categories);
  }, [categories, searchTerm]);

  return (
    <Box>
      <Combobox
        store={comboboxStore}
        onOptionSubmit={(value) => {
          // Find the selected category by URL
          const findCategoryByUrl = (
            categories: Category[],
            url: string
          ): Category | null => {
            for (const category of categories) {
              if (category.url === url) {
                return category;
              }
              if (category.categories) {
                const found = findCategoryByUrl(category.categories, url);
                if (found) return found;
              }
            }
            return null;
          };

          const selected = findCategoryByUrl(categories, value);
          if (selected) {
            handleSelect(selected);
          }
        }}
      >
        <Combobox.Target>
          <TextInput
            label={label}
            placeholder={placeholder}
            value={selectedCategory ? selectedCategory.name : searchTerm}
            onFocus={() => comboboxStore.openDropdown()}
            onChange={(event) => {
              setSearchTerm(event.currentTarget.value);
              setSelectedCategory(null);
              comboboxStore.openDropdown();
            }}
            leftSection={<IconSearch size={16} />}
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
          />
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            <ScrollArea.Autosize type="scroll" mah={200}>
              {filteredCategories.length > 0 ? (
                <Box py="xs">
                  {filteredCategories.map((category) => (
                    <CategoryItem
                      key={category.id}
                      category={category}
                      onSelect={handleSelect}
                    />
                  ))}
                </Box>
              ) : (
                <Text c="dimmed" py="md">
                  {nothingFoundMessage}
                </Text>
              )}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Box>
  );
}
interface CategoryItemProps {
  category: Category;
  onSelect: (category: Category) => void;
  level?: number;
}

function CategoryItem({ category, onSelect, level = 0 }: CategoryItemProps) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = category.categories && category.categories.length > 0;
  const isLeaf = !hasChildren;
  const indent = level * 30;

  return (
    <Box key={category.id}>
      <Combobox.Option
        value={category.url!}
        // disabled={!isLeaf}
        onMouseDown={(event) => {
          // Prevents the input from losing focus
          event.preventDefault();
        }}
        onClick={() => {
          if (isLeaf) {
            onSelect(category);
          }
        }}
      >
        <Flex align="center" ml={indent}>
          {hasChildren && (
            <UnstyledButton
              onClick={(e) => {
                e.stopPropagation();
                // Expand/collapse logic can be added if needed
                setExpanded((prev) => !prev);
              }}
              mr="xs"
            >
              {expanded ? (
                <IconChevronDown size={14} />
              ) : (
                <IconChevronRight size={14} />
              )}
            </UnstyledButton>
          )}
          <Text
            style={{
              fontWeight: hasChildren ? 600 : 400,
              cursor: isLeaf ? "pointer" : "default",
            }}
          >
            {category.name}
          </Text>
        </Flex>
      </Combobox.Option>
      {expanded && hasChildren && (
        <Box>
          {category.categories!.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
