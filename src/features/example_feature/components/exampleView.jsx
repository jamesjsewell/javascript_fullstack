import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../controller"
import ItemLayout from "./item.jsx"
import ItemForm from "./itemForm.jsx"

@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class TestView extends Component {

  constructor(props) {
    super(props)
    this.CRUD = this.props.actions.CRUD
    this.CRUD('read', {collection: this.props.items.collection})
  }
  
  componentWillReceiveProps(nextProps){

  }

  renderItems() {
    var renderedItems = []
    for (var i = 0; i < this.props.items.array.length; i++) {
      var theItem = this.props.items.array[i].attributes

      renderedItems.push(
        <ItemLayout key={`item${i}`} theItem={theItem} collection={this.props.items.collection} CRUD={this.CRUD.bind(this)} editing={this.props.items.editing} selected={this.props.items.selected} />
      )
    }

    return renderedItems
  }

  render() {

    var itemFormProps = {

      formName: 'itemForm',
      formType: this.props.items.editing ? "edit" : "create",
      CRUD: this.CRUD.bind(this),
      model: this.props.items.model,
      item: this.props.items.editing ? this.props.items.selected : null,
      itemCollection: this.props.items.collection

    }

    return (
      <div>

        {this.props.items.editing?
          <div>
            <strong>edit</strong>
            <ItemForm {...itemFormProps} />
          </div>
          :
          <div>
            <strong>create item</strong>
            <ItemForm {...itemFormProps} />
          </div>
        }

        {this.props.items.message? <div> {this.props.items.message} </div> : null}

        <br />
        <div>{this.props.items.array ? this.renderItems() : null}</div>

      </div>)
  }
}

export default withRouter(TestView)