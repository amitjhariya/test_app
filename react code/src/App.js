import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      local:"http://www.localhost/test-server/",
      live:"http://egnito.com/app/",
      isLogged: true,
      from:'0000-01-01',
      toDate:'2020-07-29',
    };
    this.onChange = this.onChange.bind(this);
  }
  

  componentDidMount() {
    fetch(this.state.live+"api?category=logs&partnerId=A&todate="+this.state.toDate+"&from="+this.state.from)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
          });
          console.log(result.items);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  resetData(to,from){
    console.log("date Chnaged")
    fetch(this.state.live+"api?category=logs&partnerId=A&toDate="+to+"&from="+from)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
          });
          console.log(result)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  onChange(e) {
    this.setState(
      {
        [e.target.name]:e.target.value
        },() => {
        console.log(this.state);
        this.resetData(this.state.toDate,this.state.from)
    });
    console.log("State :"+this.state)      
  }
  render() {


const { error, isLoaded, items } = this.state;
let A=0;
let B=0;
for (let i = 0; i < items.length; i++) {
  console.log(items[i].partner)
    if(items[i].partner==="A"){
    A++;
  }else if(items[i].partner==="B"){
    B++;
  }
}

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="preloader" />;
    } else {
      return (
        <div className="App">
          <div className="container-fluid">
            <div className="row">
              <main className="col-md-9 mx-auto col-lg-10 px-md-4">
              


              
              
              <div className="row mt-5">
              <div className="col-xl-3 col-lg-6 mx-auto">
                <div className="card card-inverse card-primary ">
                  <div className="card-block bg-primary px-3 py-3">
                    <div className="rotate">
                      <i className="fa fa-user fa-5x"></i>
                    </div>
                    <h6 className="text-light">Total</h6>
                    <h1 className="display-1 text-light">{items.length}</h1>
                  </div>
                </div>
             </div>

             <div className="col-xl-3 col-lg-6 mx-auto">
                <div className="card card-inverse card-primary ">
                  <div className="card-block bg-primary px-3 py-3">
                    <div className="rotate">
                      <i className="fa fa-user fa-5x"></i>
                    </div>
                    <h6 className="text-light">Partner A</h6>
                    <h1 className="display-1 text-light">{A}</h1>
                  </div>
                </div>
             </div>
             <div className="col-xl-3 col-lg-6 mx-auto">
                <div className="card card-inverse card-primary ">
                  <div className="card-block bg-primary px-3 py-3">
                    <div className="rotate">
                      <i className="fa fa-user fa-5x"></i>
                    </div>
                    <h6 className="text-light">Partner B</h6>
                    <h1 className="display-1 text-light">{B}</h1>
                  </div>
                </div>
             </div>
              </div>
              <div className="row text-center mt-3">
                <div className="col-md-2 ml-auto form-inline">
                <label className="text-info">From Date</label>
                  <input
                  value=""
                  placeholder="From Date"
                  name="from"
                  onChange={(e) => {
                    this.onChange(e);
                  }}
                   className="form-control text-primary my-1"  type="date" />
                </div>
                <div className="col-md-2 mr-auto form-inline">
                  <label className="text-info">To Date</label>
                  <input 
                  value=""
                  placeholder="To Date"
                  name="toDate"
                  onChange={(e) => {
                    this.onChange(e);
                  }}
                      className="form-control text-primary my-1"  type="date" />
                </div>
              </div>


              <h3 className="mt-5 mb-3 text-center text-primary" >Request Logs</h3>
              <div className="table-responsive col-md-9 mx-auto">
                <table className="table table-bordered table-hover" id="datatable">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Partner Id</th>
                      <th scope="col">Triggers</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                  {items.map((item,index) => (
                    <tr key={item.id}>
                      <td>{index+1}</td>
                      <td>{item.partner}</td>
                      <td>{item.data}</td>
                      <td>{item.time}</td>
                      
                    </tr>
                    ))}
                    
                    
                    
                  </tbody>
                </table>
              </div>

              <div className="row">
                    <div className="col-md-6 mx-auto">
                      <h2 className="text-center"> Api Info</h2>
                      <table className="table table-bordered table-hover" id="datatable">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">parameter</th>
                      <th scope="col">data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td>1</td>
                      <td>category*</td>
                      <td>table name</td>                      
                    </tr>
                    <tr >
                      <td>2</td>
                      <td>id</td>
                      <td>ID of Data row</td>                      
                    </tr>
                    <tr >
                      <td>4</td>
                      <td>partnerId*</td>
                      <td>Partner ID</td>                      
                    </tr>                          
                    
                    
                  </tbody>
                </table>
                </div>
                
              </div>
              <div className="row">
                    <div className="col-md-12">
                      <h3> Examples</h3>
                      <p>http://egnito.com/app/api?partnerId=B&category=employees</p>
                      <p>http://egnito.com/app/api?partnerId=B&category=employees&id=100</p>
                    </div>
                    <h4>Available tables :</h4>
                    <p>companies,countries,departments,employees,jobs,locations,regions,users,dependents</p>
                    <h4>Asumptions :Only Partner A and B are active</h4>
                    
              </div>

            </main>
            </div>
         </div>
        </div>
      );
    }
  }
}
export default App;

