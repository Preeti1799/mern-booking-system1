import "./featured.css";
import useFetch from '../../hooks/useFetch';

const Featured = () => {
  const { data, loading, error } = useFetch("/api/hotels/countByCity?cities=India,Hyderabad,Mumbai");

  console.log("API Response:", JSON.stringify(data, null, 2));
  console.log("Loading:", loading, "Error:", error);

  const cityData = data?.reduce((acc, item) => {
    acc[item.city] = item.count;
    return acc;
  }, {}) || {};

  const india = cityData["India"] || 0;
  const hyderabad = cityData["Hyderabad"] || 0;
  const mumbai = cityData["Mumbai"] || 0;

  return (
    <div className="featured">
      {loading && <p>Loading, please wait...</p>}
      {error && <p className="error">Error fetching data: {error.message}</p>}
      {!loading && !error && (
        <>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt="India"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>India</h1>
              <h2>{india} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt="Hyderabad"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hyderabad</h1>
              <h2>{hyderabad} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt="Mumbai"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mumbai</h1>
              <h2>{mumbai} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;