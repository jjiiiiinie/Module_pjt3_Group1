import UseFetch from '../../../../hooks/UseFetch';
import SideCategoryList from './SideCategoryList';
import SideColorList from './SideColorList';

export default function SideBar({setCategoryName, setColorName}) {

  const categoryData = UseFetch("category");
  const colorData = UseFetch("color");
  const sizeData = UseFetch("size");
  
  return(
    <div className="col-lg-3 order-2 order-lg-1">
      <div className="sidebar-style mr-30">
        <div className="sidebar-widget">
          <h4 className="pro-sidebar-title">Search </h4>
          <div className="pro-sidebar-search mb-50 mt-25">
            <form className="pro-sidebar-search-form" action="#">
              <input type="text" placeholder="Search here..." />
              <button><i className="pe-7s-search"></i></button>
            </form>
          </div>
        </div>
        <div className="sidebar-widget">
          <h4 className="pro-sidebar-title">Categories</h4>
          <div className="sidebar-widget-list mt-30">
            <ul>
              {
                categoryData.map(item => (
                  <SideCategoryList 
                    key = {item.id}
                    item = {item}
                    setCategoryName = {setCategoryName}
                  />
                ))
              }
            </ul>
          </div>

          <h4 className="pro-sidebar-title">Color</h4>
          <div className="sidebar-widget-list mt-30">
            <ul>
              {
                colorData.map(item => (
                  <SideColorList 
                    key = {item.id}
                    item = {item}
                    setColorName = {setColorName}
                  />
                ))
              }
            </ul>
          </div>

          <h4 className="pro-sidebar-title">Size</h4>
          <div className="sidebar-widget-list mt-30">
            <ul>
              {
                sizeData.map(item => (
                  <li key={item.id}>
                    <div className="sidebar-widget-list-left">
                      <button><span className="checkmark"></span>{item.name}</button>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      
        <div className="sidebar-widget mt-50">
          <h4 className="pro-sidebar-title">Tag </h4>
          <div className="sidebar-widget-tag mt-25">
            <ul>
              {
                categoryData.map(item => (
                  <li key={item.id}><button>{item.name}</button></li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}