import * as React from 'react';

export const useLoaded = () => {
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        setLoaded(true);
    }, []);

    return loaded;
}