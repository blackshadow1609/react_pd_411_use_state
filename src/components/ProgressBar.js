import './ProgressBar.css';

function ProgressBar({ precentage }) {
    const getColor = () => {
        if (precentage < 40) return "#FF0000";
        else if (precentage < 70) return "#FFA500";
        else return "#2ECC71";
    }
    return (
        <div className='progress-bar'>
            <div className='progress-bar-fill' style={{ width: `${precentage}%`, background: getColor() }}>

            </div>
        </div>
    )
}
export default ProgressBar;