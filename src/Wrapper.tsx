import { ReactNode } from 'react'

type FooProps = {
  children: ReactNode
}

const Wrapper = (props:FooProps) => {
    return (
      <div className='lg:px-28 md:px-18 sm:px-12 px-2'>
        {props.children}
      </div>
    );
   };

export default Wrapper
   