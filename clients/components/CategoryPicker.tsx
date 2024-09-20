// components/CategoryPicker.tsx
import { Category } from '@/models';
import { ComboboxItem, Select } from '@mantine/core';

interface CategoryPickerProps {
  label?: string;
  placeholder?: string;
  nothingFoundMessage?: string;
  categories: Category[];
  onSelect: (value: string | null, option: ComboboxItem) => void;
}

export default async function CategoryPicker({
  label = 'Select category',
  placeholder = 'Pick a category',
  nothingFoundMessage = 'No categories found',
  categories = [],
  onSelect,
}: CategoryPickerProps) {
  // Fetch categories on the server side

  // Convert categories to the format needed by Mantine's Select component
  const categoryOptions = categories.map((category) => ({
    value: category.url,
    label: category.name,
  } as ComboboxItem));

  // Since this is a server component, we don't handle client state directly here.
  return (
    <Select
      label={label}
      placeholder={placeholder}
      searchable
      nothingFoundMessage={nothingFoundMessage}
      data={categoryOptions}
      onChange={onSelect}
    />
  );
}
