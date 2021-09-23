import React, { FC } from 'react';
import {
 Tag, TagLabel, Stack, List, ListItem, Divider, ListIcon,
} from '@chakra-ui/react';
import { RiStickyNoteLine } from 'react-icons/ri';
import { HiMinusCircle } from 'react-icons/hi';

const Anotations: FC = () => (
  <Stack width="100%" alignItems="flex-start">
    <Tag size="md" mb={2}>
      <RiStickyNoteLine size={19} />
      <TagLabel margin={2}>Notes</TagLabel>
    </Tag>
    <Divider />
    <List spacing={2}>
      <ListItem
        px={3}
        color="gray.700"
        fontSize="sm"
        onClick={() => console.log('')}
      >
        <ListIcon
          as={HiMinusCircle}
          transition="all 200ms"
          color="gray.300"
          fontSize="18px"
          _hover={{
            cursor: 'pointer',
            transform: 'scale(1.5)',
          }}
        />
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium,
        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo.
      </ListItem>
    </List>
  </Stack>
    );

export default Anotations;
