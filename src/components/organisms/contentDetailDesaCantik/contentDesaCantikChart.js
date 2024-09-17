const { useEffect } = require("react");

const ContentDesaCantikChart = ({data}) =>{
    useEffectct(() => {
        console.log("ContentChart data updated:", data);
      }, [data]);

    return (
        <>
            <div>Content desa cantiks</div>
        </>
    )
}

export default ContentDesaCantikChart;