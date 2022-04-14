import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Paper, OutlinedInput, ClickAwayListener } from '@mui/material';
// utils
import uuidv4 from '../../utils/uuidv4';


// ----------------------------------------------------------------------

const defaultTask = {
  description: '',
  assignee: [],
};

DashboardTaskAdd.propTypes = {
  onAddTask: PropTypes.func,
  onCloseAddTask: PropTypes.func,
};

export default function DashboardTaskAdd({ onAddTask, onCloseAddTask }) {
  const [name, setName] = useState('');

  const handleKeyUpAddTask = (event) => {
    if (event.key === 'Enter') {
      if (name.trim() !== '') {
        onAddTask({ ...defaultTask, id: uuidv4(), name, });
      }
    }
  };

  const handleClickAddTask = () => {
    if (name) {
      onAddTask({ ...defaultTask, id: uuidv4(), name });
    }
    onCloseAddTask();
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAddTask}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <OutlinedInput
            multiline
            size="small"
            placeholder="Task name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyUp={handleKeyUpAddTask}
            sx={{
              '& input': { p: 0 },
              '& fieldset': { borderColor: 'transparent !important' },
            }}
          />
        </Paper>
      </ClickAwayListener>
    </>
  );
}

