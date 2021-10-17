import { useCallback, useState } from 'react'

function useInputs(initialState) {
    const [form, setForm] = useState(initialState);
    const onChange = useCallback(e => {
        const { name, value } = e.target;
        setForm(form => ({ ...form, [name]: value }));
    }, []);
    const reset = useCallback(() => setForm(initialState), [initialState]);
    return [form, onChange, reset];
}

export default useInputs;
