import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import react, { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { SearchContext } from '../../context/SearchContext';
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import Footer from "../../components/footer/Footer";
import Option from "../../components/header/Option";
import Filter from "../../components/filter/Filter";
const List = () => {
  const { dispatch } = useContext(SearchContext);
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("999.999.999");
  const [queryString, setQueryString] = useState(
    `/hotels?city=${destination}&adult=${options.adult}&child=${options.children}&room=${options.room}&min=${min || "0"}&max=${max || "999.999.999"}`,
  );
  const { data, loading, error, reFetch } = useFetch(queryString);

  useEffect(() => {
    // Scroll to the top of the page when the component is rendered
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    setQueryString(
      `/hotels?city=${destination}&adult=${options.adult}&child=${options.children}&room=${options.room}&min=${min || "0"}&max=${max || "999.999.999"}`,
    );
  }, [destination, options, min, max]);
  const handleClick = () => {
    dispatch &&
      dispatch({
        type: 'NEW_SEARCH',
        payload: { destination, options },
      });
    reFetch()
  }
  const handleChange = (event) => {
    setDestination(event.target.value);
  }
  return (
    <div className="mainContainer">
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <div className="listMainSearch">
              <h1 className="lsTitle">Tìm kiếm</h1>
              <div className="lsItem">
                <label>Địa điểm</label>
                <input placeholder={destination} type="text" onChange={handleChange} />
              </div>
              <div className="lsItem">
                <div className="lsOptionItem">
                  <Option options={options} setOptions={setOptions} />
                </div>
              </div>
              <button onClick={handleClick} disabled={!destination}>Tìm</button>
            </div>
            <Filter min={min} max={max} setMin={setMin} setMax={setMax} queryString={queryString} setQueryString={setQueryString} />
          </div>

          <div className="listResult">
            {data.length !== 0 ? (
              <>
                <h2 style={{ marginBottom: "20px" }}>{destination}: {data.length} homestays</h2>
                {loading ? "loading" : <>
                  {data && data?.map(item => (
                    <SearchItem item={item} key={item._id} />
                  ))}
                </>}
              </>
            ) : (
              <span>Không tìm thấy homestays theo yêu cầu</span>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
