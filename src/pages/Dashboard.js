// @mui
import { Container, Stack } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { persistColumn, persistCard } from '../redux/slices/dashboard';
// components
import Page from '../components/Page';
// sections
import { DashboardColumn, DashboardColumnAdd } from '../sections/dashboard';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.dashboard);

  const onDragEnd = (result) => {
    // Reorder card
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      dispatch(persistColumn(newColumnOrder));
      return;
    }

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start.id === finish.id) {
      const updatedCardIds = [...start.cardIds];
      updatedCardIds.splice(source.index, 1);
      updatedCardIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...start,
        cardIds: updatedCardIds,
      };

      dispatch(
        persistCard({
          ...board.columns,
          [updatedColumn.id]: updatedColumn,
        })
      );
      return;
    }

    const startCardIds = [...start.cardIds];
    startCardIds.splice(source.index, 1);
    const updatedStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = [...finish.cardIds];
    finishCardIds.splice(destination.index, 0, draggableId);
    const updatedFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    dispatch(
      persistCard({
        ...board.columns,
        [updatedStart.id]: updatedStart,
        [updatedFinish.id]: updatedFinish,
      })
    );
  };

  return (
    <Page title="Dashboard" sx={{ height: 1 }}>
      <Container maxWidth={false} sx={{ height: 1, display: 'flex', flexWrap: 'wrap' }}>
        <DragDropContext onDragEnd={onDragEnd} style={{ flexWrap: 'wrap' }}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column" style={{ flexWrap: 'wrap' }}>
            {(provided) => (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                direction="row"
                alignItems="flex-start"
                spacing={3}
                sx={{ height: 'calc(100% - 32px)', overflowY: 'hidden' }}
                mb={2}
              >
                
                  {board.columnOrder.map((columnId, index) => (
                    <DashboardColumn index={index} key={columnId} column={board.columns[columnId]} />
                  ))}
                {provided.placeholder}
                <DashboardColumnAdd />
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </Page>
  );
}
