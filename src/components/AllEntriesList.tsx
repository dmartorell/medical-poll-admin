// DEJAR MARCADA EL ENTRIE EN LA QUE ESTÁ<S></S>

import React, { FC, useState, useEffect } from 'react';
import {
 Tag, TagLabel, Stack, List, ListItem, Divider,
} from '@chakra-ui/react';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { useParams, useHistory } from 'react-router-dom';
import toTimestamp from '../helpers/toTimestamp';

type Props = {
    dates : {date: string}[],
};
const AllEntriesList: FC<Props> = ({ dates }) => {
    const history = useHistory();
    const {
        id,
        projectName,
        timestamp,
    } = (useParams<{id: string, projectName: string, timestamp: string}>());
    const [selectedIndex, setSelectedIndex] = useState<number|null>(null);
    const handleClick = (date: string) => {
        history.push({
            pathname: `/patient/${id}/pro${projectName}/ts${toTimestamp(date)}`,
            state: { date },
        });
    };
    useEffect(() => {
        const firstSelectedIndex = dates
        .findIndex((element: {date: string}) => Date.parse(element.date)
            === Number(timestamp));
        setSelectedIndex(firstSelectedIndex);
}, []);
    return (
      <Stack alignItems="flex-start">
        <Tag size="md" mb={2}>
          <HiOutlineClipboardList size={20} />
          <TagLabel margin={2}>All Entries</TagLabel>
        </Tag>
        <Divider />
        <List spacing={2}>
          {
                dates?.map(({ date }, index) => (
                  <ListItem
                    key={date}
                    cursor="pointer"
                    transition="all 150ms"
                    backgroundColor={index === selectedIndex ? 'gray.100' : ''}
                    fontWeight={index === selectedIndex ? '500' : ''}
                    borderRadius={index === selectedIndex ? 'sm' : ''}
                    color={index === selectedIndex ? 'black' : 'gray.500'}
                    px={3}
                    py={1}
                    _hover={
                        index === selectedIndex
                        ? {}
                        : {
                        color: 'black',
                        }
                    }
                    fontSize="sm"
                    onClick={() => {
                        setSelectedIndex(index);
                        handleClick(date);
                    }}
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
