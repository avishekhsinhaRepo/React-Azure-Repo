import teleSalesImg from "../assets/telesalesAgent.png";
export const Welcome = () => {
  return (
    <>
      <div className="row mt-5">
        <figure className="text-center">
          <img src={teleSalesImg} className="img-thumbnail" alt="..." style={{ height: "200px", width: "200px", backgroundColor: "transparent" }} />
          <blockquote className="blockquote">
            <h1>Welcome to TeleSales Companion.</h1>
          </blockquote>
        </figure>
      </div>
    </>
  );
};
