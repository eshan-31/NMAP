import React, { Component } from 'react';

class SearchPlace extends Component{
  state = {
    query: ''
  }

      filter = (query)=> {
        let q = query.toLowerCase();
        var up = query.toUpperCase();
        var ul = document.getElementById("ul_items")
        var li = ul.getElementsByTagName("li");
        for (var i = 0; i < li.length; i++) {
            var a = li[i].getElementsByTagName("a")[0];
              if (a.innerHTML.toUpperCase().indexOf(up) > -1) {
                  li[i].style.display = "";
              } else {
                  li[i].style.display = "none";
              }
      }
        this.setState({query:q})
        var places=[];
        this.props.markers.forEach((marker)=>{
          if(marker.title.toLowerCase().indexOf(query)>-1) {
            marker.setVisible(true);
            places.push(marker);
            this.props.open(marker);
        } else
          {
            marker.setVisible(false);
          }
        })
    }

render = ()=> {
    var locations = this.props.markers.map((mar,index)=>{
            return(<li key={index} className="li_item" value={this.state.query} onClick={this.props.info_open.bind(this,mar)}><a>{mar.title}</a></li>)
    })
	return (
		<div>
		<nav className="search" id="nav" role="navigation">
    <input type="checkbox" id="hamburger" className="hidden_menu-ticker"/>

    <label className="btn-menu" htmlFor="hamburger">
      <div className="hamburger">
        <span className="first"></span>
        <span className="second"></span>
        <span className="third"></span>
      </div>
      <div className="search_text">Search</div>
    </label>
    <aside className="hidden_menu">
          		<ul  className="locations" id="ul_items" className="menu">
                <input type="text filter" placeholder="Enter to search" value={this.state.query} className="search_items" onChange={event =>this.filter(event.target.value)}/>
                    {locations}
          		</ul>
              </aside>
      	</nav>
      	</div>
		)
}
}

export default SearchPlace;
