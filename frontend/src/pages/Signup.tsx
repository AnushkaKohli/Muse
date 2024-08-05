import Auth from '../components/Auth/Auth';
import Quote from '../components/Quote';

const Signup = () => {
    return (
        <div className='grid lg:grid-cols-2'>
            <Auth type='signup' />
            <div className='invisible lg:visible'>
                <Quote />
            </div>
        </div>
    )
}

export default Signup