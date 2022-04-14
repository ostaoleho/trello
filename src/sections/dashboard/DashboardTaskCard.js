import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
// @mui
import { Paper, Typography, Box, Tooltip } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import { IconButtonAnimate } from '../../components/animate';

// ----------------------------------------------------------------------

DashboardTaskCard.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  onDeleteTask: PropTypes.func,
};

export default function DashboardTaskCard({ card, onDeleteTask, index }) {
  const { name } = card;

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Paper
            sx={{
              px: 2,
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '250px'
            }}
          >
            <Box>
              <Typography
                noWrap
                variant="subtitle2"
                sx={{
                  py: 3,
                  pl: 5,
                  transition: (theme) =>
                    theme.transitions.create('opacity', {
                      duration: theme.transitions.duration.shortest,
                    }),
                }}
              >
                {name}
              </Typography>
            </Box>

            <Tooltip title="Delete task">
              <IconButtonAnimate onClick={() => onDeleteTask(card.id)} size="small">
                <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
