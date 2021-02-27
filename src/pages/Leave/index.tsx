import './index.css';

import React from 'react';
import {
  Inject,
  ScheduleComponent,
  WorkWeek,
  Month,
  Agenda,
  ViewsDirective,
  ViewDirective,
  EventSettingsModel,
} from '@syncfusion/ej2-react-schedule';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement, L10n } from '@syncfusion/ej2-base';
import { getLeaveRequests } from 'Services/api';
import { toast } from 'react-toastify';

import { Box, Grid } from '@material-ui/core';

L10n.load({
  'en-US': {
    schedule: {
      title: 'Subject',
      description: 'Reason',
      saveButton: 'Apply',
      cancelButton: 'Close',
      deleteButton: 'Remove',
      newEvent: 'Add Leave Request',
      editEvent: 'Edit Leave Request',
    },
  },
});

const Leave: React.FC = () => {
  const [leaveData, setLeaveData] = React.useState<EventSettingsModel>({
    dataSource: [],
    fields: {
      id: 'id',
      subject: { name: 'subject', validation: { required: true } },
      description: {
        name: 'description',
        validation: {
          required: true,
        },
      },
      startTime: { name: 'startTime', validation: { required: true } },
      endTime: { name: 'endTime', validation: { required: true } },
      isAllDay: { name: 'allDay' },
    },
  });

  const leaveTest = [
    {
      id: 1,
      subject: 'Sick Leave',
      startTime: new Date(2021, 1, 11, 9, 0),
      endTime: new Date(2021, 1, 12, 18, 0),
      allDay: false,
      description: "That's a personal matter",
      leaveType: 'SICK',
    },
  ];

  const loadData = (): void => {
    getLeaveRequests()
      .then((res) => {
        setLeaveData({
          dataSource: res,
          fields: {
            id: 'id',
            subject: { name: 'subject', validation: { required: true } },
            description: {
              name: 'description',
              validation: {
                required: true,
              },
            },
            startTime: { name: 'startTime', validation: { required: true } },
            endTime: { name: 'endTime', validation: { required: true } },
            isAllDay: { name: 'allDay' },
          },
        });
      })
      .catch((err) => {
        toast.error('Fail to load table data!');
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const onPopupOpen = (args) => {
    if (args.type === 'Editor') {
      if (!args.element.querySelector('.custom-field-row')) {
        const row = createElement('div', { className: 'custom-field-row' });
        const formElement = args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
        const container = createElement('div', { className: 'custom-field-container' });
        const inputEle = createElement('input', {
          className: 'e-field',
          attrs: { name: 'LeaveType' },
        });
        container.appendChild(inputEle);
        row.appendChild(container);
        const drowDownList = new DropDownList({
          dataSource: [
            { text: 'Sick Leave', value: 'SICK' },
            { text: 'Half Day Leave', value: 'HALF_DAY' },
            { text: 'No Pay Leave', value: 'NO_PAY' },
            { text: 'Annual Leave', value: 'ANNUAL' },
            { text: 'Mternity Leave', value: 'MATERNITY' },
          ],
          fields: { text: 'text', value: 'value' },
          value: args.data.LeaveType,
          floatLabelType: 'Always',
          placeholder: 'Leave Type',
        });
        drowDownList.appendTo(inputEle);
        inputEle.setAttribute('name', 'LeaveType');
      }
    }
  };

  return (
    <Grid container id="dashboardContent">
      <Grid item xs={12}>
        <Box className="mt-3 mb-2 pl-5">
          <Grid container direction="row">
            <Grid item xs={9}>
              <h1>Your Planed Leaves</h1>
              <ScheduleComponent
                currentView="Month"
                selectedDate={new Date()}
                eventSettings={leaveData}
                popupOpen={onPopupOpen}
              >
                <ViewsDirective>
                  <ViewDirective option="WorkWeek" />
                  <ViewDirective option="Month" />
                  <ViewDirective option="Agenda" />
                </ViewsDirective>
                <Inject services={[WorkWeek, Month, Agenda]} />
              </ScheduleComponent>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Leave;
