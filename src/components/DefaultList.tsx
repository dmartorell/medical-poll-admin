import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
 Stack, Table, Thead, Tr, Td, Tbody, Tfoot, TableCaption,
} from '@chakra-ui/react';
import { Surveys } from '../types';
import TableFields from './TableFields';

const DefaultList: FC<Surveys> = ({ surveys }) => {
  const history = useHistory();
  const fields = Object.keys(surveys[0]);
  const [lastUpdateDate] = surveys.slice(-1);
  const formattedLastUpdateDate = new Date(lastUpdateDate.date)
              .toLocaleTimeString('sp-SP', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
  });
  return (
    <Stack spacing={8}>
      <Table variant="simple">
        <TableCaption>
          Last Update:
          {' '}
          {formattedLastUpdateDate}
        </TableCaption>
        <Thead>
          <TableFields fields={fields} />
        </Thead>
        <Tbody>
          {
              surveys.map((survey) => (
                <Tr
                  key={survey.date}
                  _hover={
                  {
                    cursor: 'pointer',
                    backgroundColor: 'gray.100',
                    transition: 'all 250ms',
                  }
                }
                  onClick={() => history.push(`/patient/${survey.patientID}/`)}
                >
                  <Td>
                    {survey.patientID}
                  </Td>
                  <Td>
                    {
                        `${new Date(survey.date).toLocaleTimeString('sp-SP', {
                          year: '2-digit',
                          month: '2-digit',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          })} h`
                    }
                  </Td>
                  <Td>
                    {survey.project.project_name}
                  </Td>
                </Tr>
              ))
          }
        </Tbody>
        <Tfoot>
          <TableFields fields={fields} />
        </Tfoot>
      </Table>
    </Stack>
  );
};

export default DefaultList;

// to={`/project/${project.id}/${project.project_name}`}
