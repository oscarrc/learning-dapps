import { useState } from 'react';

const Lotto = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');

    return (
        <section className="col-12 col-md-8 col-lg-4 content text-center my-4">
            <h1>Gestión de boletos</h1>
        </section>
    )
}

export default Lotto;