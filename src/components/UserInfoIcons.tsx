import { Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import classes from './UserInfoIcons.module.css';

export function UserInfoIcons() {
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar
          src="https://api.dicebear.com/9.x/adventurer/svg"
          size={94}
          radius="md"
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            Elementary School Teacher
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            John Smith
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              john@someschool.com
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              +11 (555) 555-5555
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}