import "./NextOneButton.css"

function findClosestSection(targetElement) {
    const xpath = `following-sibling::section[1] | preceding-sibling::section[1]`;
    const result = document.evaluate(xpath, targetElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return result.singleNodeValue;
  }

const NextOneButton = () => {
  return (
    <div className="hidden lg:flex flex-col absolute top-10 right-[33%] animate-pulse cursor-pointer hover:opacity-70" onClick={(e) => {
        // esto es horrible debe ahber una mejor manera de hacer esto
        const nextSection = findClosestSection(e.target.parentNode.parentNode.parentNode);
        nextSection.scrollIntoView({
            behavior: "smooth",
            block: 'center',
            inline: 'center'
        })
    }}>
    <h2 className="text-center">Go to next one<br/>▼</h2>
    </div>
  )
}

export default NextOneButton