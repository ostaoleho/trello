import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// @mui
import { Paper, Stack, Button } from '@mui/material';
// redux
import { useDispatch } from '../../redux/store';
import { deleteColumn, addTask, deleteTask } from '../../redux/slices/dashboard';
// components
import Iconify from '../../components/Iconify';
//
import DashboardTaskAdd from './DashboardTaskAdd';
import DashboardTaskCard from './DashboardTaskCard';
import DashboardColumnToolBar from './DashboardColumnToolBar';

// ----------------------------------------------------------------------

DashboardColumn.propTypes = {
  column: PropTypes.object,
  index: PropTypes.number,
};

export default function DashboardColumn({ column, index }) {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.dashboard);
  const [open, setOpen] = useState(false);
  const { name, cardIds, id } = column;
  console.log(board, column, id);

  const handleOpenAddTask = () => {
    setOpen((prev) => !prev);
  };

  const handleCloseAddTask = () => {
    setOpen(false);
  };

  const handleDeleteTask = (cardId) => {
    console.log(cardId);
    dispatch(deleteTask({ cardId, columnId: id }));
  };

  const handleDeleteColumn = async () => {
    try {
      dispatch(deleteColumn(id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = (task) => {
    dispatch(addTask({ card: task, columnId: id }));
    handleCloseAddTask();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{ px: 2, mb: 2 }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <DashboardColumnToolBar columnName={name} onDelete={handleDeleteColumn} />

            <Droppable droppableId={id} type="task">
              {(provided) => (
                <Stack ref={provided.innerRef} {...provided.droppableProps} spacing={2} width={280}>
                  {cardIds.map((cardId, index) => (
                    <DashboardTaskCard
                      key={cardId}
                      onDeleteTask={handleDeleteTask}
                      card={board?.cards[cardId]}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>

            <Stack spacing={2} sx={{ pb: 3 }}>
              {open && <DashboardTaskAdd onAddTask={handleAddTask} onCloseAddTask={handleCloseAddTask} />}

              <Button
                fullWidth
                size="large"
                color="inherit"
                startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
                onClick={handleOpenAddTask}
                sx={{ fontSize: 14 }}
              >
                Add Task
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
