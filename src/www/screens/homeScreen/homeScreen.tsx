import React from "react";
import { setData, increaseCount, removeAll } from "../../redux/action";
import { connect } from "react-redux";
import "./homeScreen.css";

interface Props {
  setData: Function;
  increaseCount: Function;
  removeAll: Function;
  count: number;
}

interface State {
  toValue: string;
  fromValue: string;
  price: string;
  data: string[];
}

class Home extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      toValue: "",
      fromValue: "",
      price: "",
      data: [],
    };
  }
  componentDidMount() {
    let data: any = localStorage.getItem("data");
    if (data) {
      data = JSON.parse(data);

      this.props.setData(data.data);
      this.props.increaseCount(data.count);
      this.setState({
        data: data.data,
      });
    }
  }
  _addRecord = () => {
    const { toValue, fromValue, price } = this.state;

    if (toValue === "" || fromValue === "" || price === "") {
      alert("All Values are required");
      return false;
    } else if (
      isNaN(parseFloat(toValue)) ||
      isNaN(parseFloat(fromValue)) ||
      isNaN(parseFloat(price))
    ) {
      alert("All value need to be numbers Only");
      return false;
    } else if (parseFloat(toValue) < parseFloat(fromValue)) {
      alert("The 'From Value' cannnot be greater then 'To Values'");
      return false;
    } else {
      let newData: any = [...this.state.data];
      newData.push({
        toValue: toValue,
        fromValue: fromValue,
        price: price,
        id: this.props.count,
      });

      this.props.increaseCount(this.props.count + 1);
      this.setState({
        toValue: "",
        fromValue: "",
        price: "",
        data: newData,
      });
    }
  };
  _saveRecord = () => {
    this.props.setData(this.state.data);
  };
  _removeAll = () => {
    this.props.removeAll();
    this.setState({
      data: [],
    });
  };
  _deleteItem = (id: number) => {
    const filteredData = this.state.data.filter((v: any) => {
      return v.id !== id;
    });
    this.setState({
      data: filteredData,
    });
  };
  render() {
    const { toValue, fromValue, price } = this.state;

    return (
      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th>From Value</th>
              <th>to value</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((v: any) => {
              return (
                <tr key={`key_${v.id}`}>
                  <td>{v.fromValue}</td>
                  <td>{v.toValue}</td>
                  <td>{v.price}</td>
                  <td data-id={v.id}>
                    <button
                      onClick={() => {
                        this._deleteItem(v.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <input
                  value={fromValue}
                  onChange={(e) => {
                    this.setState({
                      fromValue: e.currentTarget.value,
                    });
                  }}
                />
              </td>
              <td>
                <input
                  value={toValue}
                  onChange={(e) => {
                    this.setState({
                      toValue: e.currentTarget.value,
                    });
                  }}
                />
              </td>
              <td>
                <input
                  value={price}
                  onChange={(e) => {
                    this.setState({
                      price: e.currentTarget.value,
                    });
                  }}
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="buttonConatiner">
          <div className="button">
            <button
              onClick={() => {
                this._addRecord();
              }}
            >
              Add Data
            </button>
          </div>
          <div className="button">
            <button
              onClick={() => {
                this._removeAll();
              }}
            >
              Remove All
            </button>
          </div>
          <div className="button">
            <button
              onClick={() => {
                this._saveRecord();
              }}
            >
              Save Data
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return { count: state.tableApp.count, data: state.tableApp.data };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setData: (data: object) => {
      dispatch(setData(data));
    },
    increaseCount: (data: number) => {
      dispatch(increaseCount(data));
    },
    removeAll: () => {
      dispatch(removeAll());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
