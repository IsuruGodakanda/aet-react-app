import { removeOpenModal } from 'Actions/GlobalActions';
import Button from 'Components/InputFields/Button';
import DropDown from 'Components/InputFields/Dropdown';
import Text from 'Components/InputFields/Text';
import { find, isEmpty, isEqual } from 'lodash-es';
import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addEmployee, getUserById, updateUserById } from 'Services/api';
import { UserRoles } from 'Utils/listUtil';
import { UserRole } from 'Services/userRoleService';

import { Box, Card, Grid } from '@material-ui/core';

import validateForm from './validateForm';

interface IProps {
  setLoader: (status: boolean) => void;
  selectedId?: string | undefined;
  loadTable: () => void;
}

const CreateUpdateEmployee: React.FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const { setLoader, selectedId, loadTable } = props;
  const userRolesOptions = UserRoles.options;

  const [formData, setFormData] = React.useState<IEmployeeObj>({
    email: '',
    role: UserRole.WORKER,
  });
  const { email, role } = formData;

  const [errors] = React.useState<IEmployeeObj>({
    email: '',
  });

  const [disabledForm, setDisabledForm] = React.useState<boolean>(true);

  const clearForm = () => {
    setFormData({ ...formData, email: '', role: UserRole.WORKER });
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoader(true);

    if (isEmpty(selectedId)) {
      addEmployee(formData)
        .then((res) => {
          setLoader(false);
          clearForm();
          toast.success('Employee added sucessfully!');
          dispatch(removeOpenModal());
          loadTable();
        })
        .catch((err) => {
          setLoader(false);
          toast.error('Fail to add employee!');
        });
    } else {
      updateUserById(selectedId, formData)
        .then((res) => {
          setLoader(false);
          toast.success('Employee updated sucessfully!');
          dispatch(removeOpenModal());
          loadTable();
        })
        .catch((err) => {
          setLoader(false);
          toast.error('Fail to update employee!');
        });
    }
  };

  const activeSubmitButton = () => {
    if (validateForm(formData).isValid) {
      setDisabledForm(false);
    } else {
      setDisabledForm(true);
    }
  };

  const formDataLoad = (): void => {
    if (!isEmpty(selectedId)) {
      setLoader(true);

      getUserById(selectedId)
        .then((res) => {
          setLoader(false);
          setFormData({ ...formData, email: res.email, role: res.role });
        })
        .catch((err) => {
          setLoader(false);
          toast.error('Fail to load employee data!');
        });
    }
  };

  React.useEffect(() => {
    formDataLoad();
  }, []);

  React.useEffect(() => {
    activeSubmitButton();
  }, [formData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (_event: ChangeEvent<IOptionObj>, value: unknown, fieldName: string): void => {
    const selectedOption = value as IOptionObj;
    if (isEqual(fieldName, 'role')) {
      setFormData({ ...formData, [fieldName]: selectedOption.value });
    }
  };

  const getOptionLabel = (option: IOptionObj): string => {
    if (option !== undefined) {
      const optionItem = option as IOptionObj;
      return optionItem.name;
    }
    return '';
  };

  return (
    <Grid item xs={12}>
      <Box>
        <Grid>
          <Card className="cardfull">
            <form>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <h3>{selectedId ? 'UPDATE EMPLOYEE' : 'CREATE NEW EMPLOYEE'}</h3>
                  <p>{selectedId ? 'Modify the details of this employee' : 'Enter the details of new employee'}</p>
                </Grid>
                <Grid item xs={4}>
                  <Text
                    id="email"
                    name="email"
                    type="text"
                    label="Email"
                    value={email}
                    required
                    onChange={handleChange}
                    validateField={validateForm}
                    errorMsg={errors.email}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DropDown
                    id="role"
                    label="User Role"
                    options={userRolesOptions}
                    selectedOption={role ? find(userRolesOptions, { value: role }) : undefined}
                    style={{ width: 320 }}
                    disableClearable
                    getOptionLabel={getOptionLabel}
                    onSelectionChange={(event, value) => {
                      handleSelectChange(event, value, 'role');
                    }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Grid container direction="row">
                    <Grid item xs={5}>
                      <Button
                        id="addEmployee"
                        type="submit"
                        value={selectedId ? 'Save' : 'Create'}
                        onClick={onSubmit}
                        disabled={disabledForm}
                        className="w-320px h-60px focus:outline-none"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Box>
    </Grid>
  );
};

CreateUpdateEmployee.defaultProps = {
  selectedId: '',
};

export default CreateUpdateEmployee;
