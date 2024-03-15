// import AuthContext from "../contexts/AuthContext";
// import { useContext, useEffect, useState } from "react";
// import { getUserPosts, deletePost } from "../services/PostService";
// import PostsByUser from "../components/PostsByUser";
// import Button from "../components/Button";
// import { useParams } from "react-router-dom";
// import { getUserByID } from "../services/UserService";
// import {
//   toggleFollow,
//   getUserFollowed,
//   getUserFollowing,
// } from "../services/FollowService";
// import { Link } from "react-router-dom";
// import "./durationChart.css";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const DurationChart = (props) => {
//   const [data, setData] = useState([]);
//   const userId = useParams();
//   const { user, logout } = useContext(AuthContext);
//   const [userPosts, setUserPosts] = useState([]);
  

// //   useEffect(() => {
// //     // if (userId) {
// //     //   getUserPosts(userId.id).then((response) => {
// //     //     response.sort((a, b) => b.createdAt - a.createdAt);
// //     //     addDurationAndSetTotalCount(response);
// //     //   });
// //     //   getUserByID(userId.id).then((response) => {
// //     //     setUserPosts(response);
// //     //   });
// //     // }
// //     getUserPosts(user.id).then((response) => {
// //       response.sort((a, b) => b.createdAt - a.createdAt);
// //       setUserPosts(response);
// //     });

// //   }, []);

//   return (
//     <div className="chart-container">
//       <h2>Gráfico de Duración de Posts</h2>
//       <canvas id="durationChart" width="400" height="200"></canvas>
//     </div>
//   );
// };

// export default DurationChart;
