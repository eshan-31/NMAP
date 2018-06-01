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
        } else
          {
            marker.setVisible(false);
          }
        })
    }

render = ()=> {
    var locations = this.props.markers.map((marker,index)=>{
            return(<li key={index} className="li_item" value={this.state.query}><a href="#">{marker.title}</a></li>)
    })
	return (
		<div>
		<nav className="search" id="nav" role="navigation">
    <input type="checkbox" id="hamburger" class="hidden_menu-ticker"/>

    <label class="btn-menu" for="hamburger">
      <div class="hamburger">
        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
      </div>
      <div class="search_text">Search</div>
    </label>
    <aside class="hidden_menu">
          		<ul  class="locations" id="ul_items" className="menu">
                <input type="text filter" placeholder="Enter to search" value={this.state.query} className="search_items" onChange={event =>this.filter(event.target.value)} tabIndex="1"/>
                    {locations}
          		</ul>
              </aside>
      	</nav>
      	</div>
		)
}
}

export default SearchPlace;
