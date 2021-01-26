import { Box, Card, Grid } from '@material-ui/core';
import { toast } from 'react-toastify';

import React, { ChangeEvent } from 'react';
import Text from 'Components/input-fields/text';
import { find, isEqual, isEmpty } from 'lodash-es';
import { getUserById, addEmployee, updateUserById } from 'Services/api';
import DropDown from 'Components/input-fields/dropdown';
import Button from 'Components/input-fields/button';
import { UserRoles } from 'Utils/ListUtil';

import validateForm from './validateForm';

type TProps = {
  setLoader: (status: boolean) => void;
  selectedId?: string | undefined;
  loadTable: () => void;
};

const CreateUpdateEmployee = (props: TProps): JSX.Element => {
  const { setLoader, selectedId, loadTable } = props;
  const userRolesOptions = UserRoles.options;

  const [formData, setFormData] = React.useState<IEmployeeObj>({
    name: '',
    email: '',
    role: 'worker',
  });
  const { name, email, role } = formData;

  const [errors] = React.useState<IEmployeeObj>({
    name: '',
    email: '',
    role: undefined,
  });

  const [disabledForm, setDisabledForm] = React.useState<boolean>(true);

  const clearForm = () => {
    setFormData({ ...formData, name: '', email: '', role: 'worker' });
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
          setFormData({ ...formData, name: res.name, email: res.email, role: res.role });
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
                    id="name"
                    name="name"
                    type="text"
                    label="Full Name"
                    value={name}
                    required
                    onChange={handleChange}
                    validateField={validateForm}
                    errorMsg={errors.name}
                  />
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
