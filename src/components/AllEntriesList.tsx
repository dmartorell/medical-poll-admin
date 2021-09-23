// DEJAR MARCADA EL ENTRIE EN LA QUE ESTÁ<S></S>

import React, { FC } from 'react';
import {
 Tag, TagLabel, Stack, List, ListItem, Divider,
} from '@chakra-ui/react';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { useParams, useHistory } from 'react-router-dom';
import toTimestamp from '../helpers/toTimestamp';

type Props = {
    dates : {date: string}[]
};
const AllEntriesList: FC<Props> = ({ dates }) => {
    const history = useHistory();
    const {
        id,
        projectName,
      } = (useParams<{id: string, projectName: string, date: string}>());

    const handleClick = (date: string) => {
        history.push({
            pathname: `/patient/${id}/pro${projectName}/ts${toTimestamp(date)}`,
            state: { date },
          });
    };

    return (
      <Stack alignItems="flex-start">
        <Tag size="md" mb={2}>
          <HiOutlineClipboardList size={20} />
          <TagLabel margin={2}>All Entries</TagLabel>
        </Tag>
        <Divider />
        <List spacing={2}>
          {
                dates?.map(({ date }) => (
                  <ListItem
                    transition="all 200ms"
                    px={3}
                    _hover={{
                        color: 'black',
                        cursor: 'pointer',
                        backgroundColor: 'gray.100',
                    }}
                    fontSize="sm"
                    color="gray.600"
                    onClick={() => handleClick(date)}
                  >
                    {new Date(date).toLocaleDateString('sp-SP')}
                  </ListItem>
))
            }
        </List>
      </Stack>
    );
};

export default AllEntriesList;
