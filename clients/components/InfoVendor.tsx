import { User } from "@/lib/auth";
import { Popover, Text, Button, Badge } from '@mantine/core';

export default function InfoVendor({user}: {user: User}) {
    return (
        <Popover width={250} position="right" withArrow shadow="md">
        <Popover.Target>
            <Button color="pink">{user?.fullName}</Button>
            {/* <Badge>{user?.fullName}</Badge> */}
        </Popover.Target>
        <Popover.Dropdown>
            <Text>Số điện thoại: {user?.phoneNumber}</Text>
            <Text>Địa chỉ: {user?.address.addressLines + ", " + user?.address.country + ", " + user?.address.locality}</Text>
        </Popover.Dropdown>
        </Popover>
    );
}