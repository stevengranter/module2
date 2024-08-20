import { Avatar, Group, Text } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';

import classes from './UserInfoIcons.module.css';

export function UserInfoIcons() {
  return (
    <div>
      <Group wrap='nowrap'>
        <Avatar
          src='https://api.dicebear.com/9.x/adventurer/svg'
          radius='md'
          size={94}
        />
        <div>
          <Text
            tt='uppercase'
            c='dimmed'
            fw={700}
            fz='xs'
          >
            Elementary School Teacher
          </Text>

          <Text
            className={classes.name}
            fw={500}
            fz='lg'
          >
            John Smith
          </Text>

          <Group
            wrap='nowrap'
            gap={10}
            mt={3}
          >
            <IconAt
              className={classes.icon}
              stroke={1.5}
              size='1rem'
            />
            <Text
              c='dimmed'
              fz='xs'
            >
              john@someschool.com
            </Text>
          </Group>

          <Group
            wrap='nowrap'
            gap={10}
            mt={5}
          >
            <IconPhoneCall
              className={classes.icon}
              stroke={1.5}
              size='1rem'
            />
            <Text
              c='dimmed'
              fz='xs'
            >
              +11 (555) 555-5555
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
