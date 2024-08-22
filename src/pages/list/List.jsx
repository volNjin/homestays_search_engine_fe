import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import Footer from "../../components/footer/Footer";
import Filter from "../../components/filter/Filter";
import Pagination from "@mui/material/Pagination";
const List = () => {
  const location = useLocation();
  const destination = location.state.destination;
  const options = location.state.options;
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("999.999.999");
  const [queryString, setQueryString] = useState(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels?city=${destination}&adult=${options.adult}&child=${
      options.children
    }&room=${options.room}&min=${min || "0"}&max=${max || "999.999.999"}`
  );
  const { data, loading, error } = useFetch(queryString);

  useEffect(() => {
    // Scroll to the top of the page when the component is rendered
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    setQueryString(
      `${process.env.REACT_APP_API_ENDPOINT}/hotels?city=${destination}&adult=${options.adult}&child=${
        options.children
      }&room=${options.room}&min=${min || "0"}&max=${max || "999.999.999"}`
    );
  }, [destination, options, min, max]);

  if (error) {
    <p>{error}</p>;
  }
  const homesPerPage = 25;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indexes of the first and last homes on the current page
  const indexOfLasthome = currentPage * homesPerPage;
  const indexOfFirsthome = indexOfLasthome - homesPerPage;

  // Get the homes for the current page
  const currentHomes = data.slice(indexOfFirsthome, indexOfLasthome);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / homesPerPage);

  // Function to handle page changes
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="mainContainer">
      <Navbar />
      <Header />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <Filter
              min={min}
              max={max}
              setMin={setMin}
              setMax={setMax}
              queryString={queryString}
              setQueryString={setQueryString}
            />
          </div>

          <div className="listResult">
            {loading ? (
              "loading"
            ) : data.length !== 0 ? (
              <>
                <h2 style={{ marginBottom: "20px" }}>
                  {destination}: tìm thấy {data.length} homestays
                </h2>
                <>
                  {currentHomes?.map((item) => (
                    <SearchItem item={item} key={item._id} />
                  ))}
                </>
                <div className="pagination-container">
                  <Pagination
                    count={totalPages}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                  />
                </div>
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
