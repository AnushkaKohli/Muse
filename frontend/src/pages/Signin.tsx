import Auth from '../components/Auth/Auth';
import Quote from '../components/Quote';

const Signin = () => {
    return (
        <div className='grid lg:grid-cols-2'>
            <Auth type='signin' />
            <div className='invisible lg:visible'>
                <Quote />
            </div>
        </div>
    )
}

export default Signin