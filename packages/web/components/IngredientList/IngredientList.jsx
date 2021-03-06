import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Droppable } from 'react-beautiful-dnd';

import css from './IngredientList.module.css';

const IngredientList = ({ stepId, children }) => {
  return children.length > 0 ? (
    <Droppable type="INGREDIENT" droppableId={stepId}>
      {(provided, snapshot) => (
        <ul
          className={classnames(css.ingredients, {
            [css.draggingOver]: snapshot.isDraggingOver,
          })}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  ) : (
    <div>Some placeholder stuff for ingredients... la la la!</div>
  );
};

IngredientList.propTypes = {
  stepId: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
};

export default IngredientList;
