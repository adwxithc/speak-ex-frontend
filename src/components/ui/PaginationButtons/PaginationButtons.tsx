import ReactPaginate from "react-paginate"
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from "lucide-react";
function PaginationButtons({totalPages,currentPage,setCurrentPage}:{totalPages:number,currentPage:number,setCurrentPage:React.Dispatch<React.SetStateAction<number>>}) {
    const PaginationVarianats ={
        hidden:{
            opacity:0,
            y:200,
        },
        visible:{
            opacity:1,
            y:0,
            trasition:{
                type:"spring",
                stiffness:260,
                damping:20,
                duration:1
            }
        }
    };

    const handlePageClick=({selected}:{selected:number})=>{
        setCurrentPage(selected)
    }
    const showNextButton= currentPage!==totalPages-1
    const showPreviousButton = currentPage!==0
  return (
    <motion.div variants={PaginationVarianats} initial="hidden" animate="visible">
      <ReactPaginate
        breakLabel={
            <span className="mr-4">
               ...
            </span>
        }
        nextLabel={
            showNextButton &&
        <span className="w-10 h-10 flex items-center justify-center bg-secondary rounded-md">
            <ChevronRight />
        </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel={
            showPreviousButton &&
            <span className="w-10 h-10 flex items-center justify-center bg-secondary rounded-md mr-4">
            <ChevronLeft />
        </span>
        }
        
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block  border-solid border-secondary hover:bg-secondary w-10 h-10 flex items-center justify-center mr-4"
       activeClassName="bg-primary text-white rounded-md"
      />
    </motion.div>
  )
}

export default PaginationButtons
