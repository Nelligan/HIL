import React, {useCallback, useRef} from 'react'
import { HILGifs } from './Types/HILTypes'
import GifCard from './GifCard/GifCard'
import { VariableSizeGrid as Grid } from 'react-window';
import './style/style.css'
interface HIL {
    gifs: HILGifs[],
    isLoading: boolean
    isError: boolean
}

/**
 * Further development, we can provide custom componets for the Loading,Error && no gifs found
 */
const TrendingGifs: React.FC<HIL> = React.memo(({gifs, isLoading, isError}: HIL) => {
    const gridRef = useRef<Grid>(null);
    const getItemHeight = useCallback(() => 200, []); // Example: Fixed height for each row
    const getItemWidth = useCallback((index: number) => {
      // Example: Return dynamic widths
      return index % 2 === 0 ? 250 : 200; // Alternate widths for demonstration
    }, []);
    const columnCount = 6; // Number of columns in the grid
    const rowCount = Math.ceil(gifs?.length / columnCount);

    const renderCell = ({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
        const index = rowIndex * columnCount + columnIndex;
        if (index >= gifs.length) return null;
    
        const gif = gifs[index];
        return (
          <div className="grid-cell" style={style}>
            <GifCard key={gif.id} gif={gif} />
          </div>
        );
      }


    return isLoading ? (
        <div>Loading...</div>
    ) : isError ? (
        <div>Error trying to fetch gifs</div>
    ) : 
    gifs.length === 0 ? <div>No gifs found</div> :

(
            <div data-testid="trending-gifs" className="grid-wrapper">

    <Grid
    ref={gridRef}
    columnCount={columnCount}
    rowCount={rowCount}
    columnWidth={getItemWidth}
    rowHeight={getItemHeight}
    height={670} // Adjust this height to fit your layout
    width={3000} // Adjust this width to fit your layout
    style={{ overflowX: 'hidden' }}
  >
    {renderCell}
  </Grid>
</div>
)
})

export default TrendingGifs