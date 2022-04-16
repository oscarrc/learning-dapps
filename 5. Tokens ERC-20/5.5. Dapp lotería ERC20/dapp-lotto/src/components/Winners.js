import { useState } from 'react';

const Winners = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');

    return (
        <section className="col-12 col-md-8 col-lg-4 content text-center my-4">
            <h1>Premios de lotería</h1>
        </section>
    )
}

export default Winners;