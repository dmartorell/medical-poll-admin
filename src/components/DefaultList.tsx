import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
 Stack, Table, Thead, Tr, Td, Tbody, Tfoot, TableCaption,
} from '@chakra-ui/react';
import { Surveys } from '../types';
import TableFields from './TableFields';

const DefaultList: FC<Surveys> = ({ surveys }) => {
  const history = useHistory();
  // const [resortedSurveys, setResortedSurveys] = useState<iSurvey[]>([...surveys]);
  const fields = Object.keys(surveys[0]);
  const [lastUpdateDate] = surveys.slice(0, 1);
  const formattedLastUpdateDate = lastUpdateDate.date
    ? new Date(lastUpdateDate.date)
              .toLocaleTimeString('sp-SP', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
  })
  : 'unknown';

  return (
    <Stack>
      <Table variant="simple">
        <TableCaption mt="-5px" marginTop={4} placement="bottom">
          Last Update:
          {' '}
          {formattedLastUpdateDate}
        </TableCaption>
        <Thead>
          <TableFields
            fields={fields}
          />
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
                  {
                    Object.keys(survey).map((property) => {
                      if (property === 'date') {
                        return (
                          <Td key="">
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
);
                      } if (property === 'project') {
                          return (
                            <Td>
                              {survey.project.project_name}
                            </Td>
);
                      }
                        return (
                          <Td>
                            {survey[property]}
                          </Td>
);
})
                  }
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
