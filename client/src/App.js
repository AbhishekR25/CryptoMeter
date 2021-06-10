import './App.css';
import React from 'react';
import axios from 'axios';

var cacheResp = null;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      coinSymbols: ['BTC','ETH','DOGE','XRP','BNB','ETC'],
      coinPrices: '',
      percentChange24h: '',
      convertToCurrency: ['INR','USD','EUR','RUB'],
      apiResp: null,
      respArray: []
    }
    this.pushToJson = this.pushToJson.bind(this);
  }

  componentDidMount(){
    var url = "http://localhost:3000/api/multiplefull";

    console.log(this.state.coinSymbols);

    // if(cacheResp == null)
    // {
    //   cacheResp = this.state
    // }

    axios.get(url, {
      params : {
        name: this.state.coinSymbols.toString(),
        convertTo: this.state.convertToCurrency.toString()
      }
    })
    .then((response) => {
      console.log(response.data.DISPLAY);
      this.setState({apiResp: response.data.DISPLAY});
      var resp = []
      if(this.state.apiResp != null)
      {
        Object.keys(this.state.apiResp).forEach(key => resp.push({name: key, value: this.state.apiResp[key]}))
        console.log("Resp: ",resp);
        this.setState({respArray: resp})
        console.log(this.state.respArray);
      }
    })
    this.pushToJson();
  }
  
  pushToJson(){

  }

  render(){
    cacheResp = this.state.apiResp;
    if(this.state.apiResp == null && this.state.respArray.length <= 0)
    {
      return(<div class="loader"></div>)
    }
    // else if(cacheResp != null){
    //   var resp = []
    //   Object.keys(cacheResp).forEach(key => resp.push({name: key, value: cacheResp[key]}))
    //   console.log("Resp: ",resp);
    //   this.setState({respArray: resp})
    //   console.log(this.state.respArray);
    // }
    return(
      <div>
      <table className="bigOnes">
      <thead>
        <tr>
          <th>Coin Symbol</th>
          <th>Prices</th>
        </tr>
      </thead>
      <tbody>
        {this.state.respArray.map((item,index)=>{
          return(
            <tr>
            <td>{this.state.coinSymbols[index]}</td>
            <td>
              <ul>
                <li><a>INR: {item.value.INR.PRICE}</a></li>
                <li><a>USD: {item.value.USD.PRICE}</a></li>
                <li><a>EUR: {item.value.EUR.PRICE}</a></li>
                <li><a>RUB: {item.value.RUB.PRICE}</a></li>
              </ul>
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    </div>
    )
  }
}

export default App;
