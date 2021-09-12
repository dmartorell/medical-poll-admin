import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
 Stack, Table, Thead, Tr, Td, Tbody, Tfoot,
} from '@chakra-ui/react';
import { Surveys } from '../types';
import TableFields from './TableFields';

const DetailsList: FC<Surveys> = ({ surveys }) => {
  const history = useHistory();
  // const [resortedSurveys, setResortedSurveys] = useState<iSurvey[]>([...surveys]);
  const fields = Object.keys(surveys[0]);
  return (
    <Stack>
      <Table size="sm" variant="simple">
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
                  onClick={() => history.push(`/patient/${survey.patientID}/pro${survey.project.project_name}`)}
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
                              })}h`
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

export default DetailsList;
