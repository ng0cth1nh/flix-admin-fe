import { ThreeDots } from "react-loader-spinner";
const Loading = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="blue"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};
export default Loading;
