import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { useNavigate } from 'react-router-dom';
const Featured = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch("hotels/countByCity?cities=Hà Nội,Hồ Chí Minh,Đà Nẵng,Hải Phòng,Huế");
  const dummy_featured_1 = [
    {
      src: 'https://q-xx.bstatic.com/xdata/images/city/500x400/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o=',
      province: 'Hà Nội',
      propertyCount: data && data[0],
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/city/500x400/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=',
      province: 'Hồ Chí Minh',
      propertyCount: data && data[1],
    },
  ];

  const dummy_featured_2 = [
    {
      src: 'https://cf.bstatic.com/xdata/images/city/500x400/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=',
      province: 'Đà Nẵng',
      propertyCount: data && data[2],
    },
    {
      src: 'https://cf.bstatic.com/xdata/images/xphoto/500x400/140009656.jpg?k=350b38ee5a5f178f225d363eab93c7c14fbfee30168745e7db3a5fa38cd5be0e&o=',
      province: 'Hải Phòng',
      propertyCount: data && data[3],
    },
    {
      src: 'https://r-xx.bstatic.com/xdata/images/city/500x400/688886.jpg?k=91c47e49d89f3a4c2408a360bbbe8b08d11e35e3d6d253c7efb27b5ca4d40a61&o=',
      province: 'Huế',
      propertyCount: data && data[4],
    },
  ];

  const handleClick = (province) => {
    navigate('/hotels', {
      state: {
        destination: province,
        options: { adult: 1, children: 0, room: 1 },
        openDate: true,
      },
    });
  };
  return (
    <div className="featured">
      {
        loading ? ("Loading please wait") : (
          <div className="featuredContainer">
            <div className="featuredList">
              {dummy_featured_1.map((featured, index) => (
                <div className="featuredItem"
                  key={index}
                  onClick={() => handleClick(featured.province)}>
                  <img
                    src={featured.src}
                    alt=""
                    className="featuredImg"
                  />
                  <div className="featuredTitles">
                    <h1>{featured.province}</h1>
                    <h2>{featured.propertyCount} homestays</h2>
                  </div>
                </div>
              ))}
            </div>
            <div className="featuredList">
              {dummy_featured_2.map((featured, index) => (
                <div className="featuredItem"
                  key={index}
                  onClick={() => handleClick(featured.province)}>
                  <img
                    src={featured.src}
                    alt=""
                    className="featuredImg"
                  />
                  <div className="featuredTitles">
                    <h1>{featured.province}</h1>
                    <h2>{featured.propertyCount} homestays</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Featured;
