const Footer = ({contractAddress}) => {
    return (
        <footer className="d-flex justify-content-center text-center py-4" >
            <span className="badge bg-dark">Contract: {contractAddress}</span>
        </footer>
    )
}

export default Footer;