import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import {
  MdDragHandle,
  MdEdit,
  MdClear,
  MdCheck,
  MdRefresh,
  MdAdd
} from 'react-icons/md';
import classnames from 'classnames';

import css from './Item.css';
import TextButton from '../TextButton';
import TextButtonGroup from '../TextButtonGroup';

export default class Item extends PureComponent {
  static displayName = 'Item';

  static propTypes = {
    children: PropTypes.node,
    index: PropTypes.number,
    itemId: PropTypes.string,
    handleItemChange: PropTypes.func,
    itemNameValue: PropTypes.string,
    itemName: PropTypes.node,
    removed: PropTypes.bool,
    isLast: PropTypes.bool,
    focusOnMount: PropTypes.bool,
    removeItem: PropTypes.func,
    restoreItem: PropTypes.func,
    createItem: PropTypes.func,
    createStep: PropTypes.func
  };

  state = {
    hovering: false,
    editing: false,
    removed: false,
    isLast: false,
    focusOnMount: false
  };

  itemRef = React.createRef();
  inputRef = React.createRef();

  componentDidMount() {
    if (this.props.focusOnMount) this.enableEditing();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  enableEditing = async () => {
    await this.setState({ editing: true });
    this.inputRef.current.focus();
    document.addEventListener('mousedown', this.handleClick);
  };

  disableEditing = () => {
    this.setState({ editing: false });
    document.removeEventListener('mousedown', this.handleClick);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.disableEditing();
  };

  handleClick = e => {
    if (this.itemRef.current.contains(e.target)) return;
    this.disableEditing();
  };

  mouseEnter = () => {
    this.setState({ hovering: true });
  };

  mouseLeave = () => {
    this.setState({ hovering: false });
  };

  handleRemove = e => {
    e.stopPropagation();
    this.props.removeItem();
  };

  handleRestore = e => {
    e.stopPropagation();
    this.props.restoreItem();
  };

  handleSave = e => {
    e.preventDefault();
    this.disableEditing();
    if (!this.props.itemNameValue) this.props.removeItem();
  };

  handleCreateStep = () => {
    const { editing } = this.state;
    const { createStep } = this.props;
    if (!editing) createStep();
  };

  handleCreateItem = () => {
    const { editing } = this.state;
    const { createItem } = this.props;
    if (!editing) createItem();
  };

  render() {
    const {
      children,
      itemId,
      index,
      itemName,
      removed,
      isLast,
      restoreItem
    } = this.props;
    const { hovering, editing } = this.state;
    return (
      <Draggable type="ITEM" draggableId={itemId} index={index}>
        {(provided, snapshot) => (
          <div
            className={css.itemWrap}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              className={classnames(css.item, {
                [css.hover]: hovering,
                [css.editing]: editing,
                [css.dragging]: snapshot.isDragging
              })}
            >
              <div
                onMouseOver={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
                className={css.itemHeaderWrap}
                ref={this.itemRef}
              >
                <div className={css.dragHandle} {...provided.dragHandleProps}>
                  <MdDragHandle />
                </div>
                <div className={css.itemHeader}>
                  <div className={css.itemName} onClick={this.enableEditing}>
                    {itemName &&
                      React.cloneElement(itemName, {
                        editing,
                        removed,
                        restoreItem,
                        inputRef: this.inputRef
                      })}
                  </div>
                  <div className={css.itemActions}>
                    {editing && (
                      <button
                        title="Save modifications"
                        onClick={this.handleSave}
                      >
                        <MdCheck />
                      </button>
                    )}

                    {!editing && removed && (
                      <button title="Restore item" onClick={this.handleRestore}>
                        <MdRefresh />
                      </button>
                    )}

                    {!editing && !removed && (
                      <>
                        <button
                          title="Edit item name"
                          onClick={this.enableEditing}
                        >
                          <MdEdit />
                        </button>
                        <button title="Remove item" onClick={this.handleRemove}>
                          <MdClear />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {children}
            </div>
            <TextButtonGroup
              className={classnames(css.itemActions, {
                [css.dragging]: snapshot.isDragging
              })}
            >
              <TextButton onClick={this.handleCreateStep} disabled={editing}>
                <MdAdd /> add step
              </TextButton>

              {isLast && (
                <TextButton onClick={this.handleCreateItem} disabled={editing}>
                  <MdAdd /> add item
                </TextButton>
              )}
            </TextButtonGroup>
          </div>
        )}
      </Draggable>
    );
  }
}
