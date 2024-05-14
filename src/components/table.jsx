export const Table = ({tableData = []}) => {
    return (
        <div className='milkTable'>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Total Time</th>
                        <th>Qty(l)</th>
                    </tr>
                </thead>
                <tbody>
                        {tableData?.map((data, index) => (
                        <tr key={index}>
                            <td>{data.milkDate}</td>
                            <td>{data.milkStartTime}</td>
                            <td>{data.milkEndTime}</td>
                            <td>{data.milkTotalDuration}</td>
                            <td>{data.milkTotalQuantity}</td>
                        </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;