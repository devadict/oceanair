export function transformFlightData(type, data) {
    let finalData = {
      quotes: [],
    };
    for (let key in data) {
      if (key == "Quotes") {
        data[key].forEach((quote) => {
          finalData.quotes.push({
            price: quote.MinPrice,
            direct: quote.Direct,
            carrier: data.Carriers.find(
              (data) => data.CarrierId == quote.OutboundLeg.CarrierIds[0]
            ),
            date: quote.OutboundLeg.DepartureDate,
            currency: data.Currencies[0].Symbol,
          });
        });
      }
    }
  
    let cheapestRate = calculateRange(finalData.quotes);
    finalData.quotes.forEach((data, index) => {
      if (data.price == cheapestRate) {
        data.cheapest = true;
      } else {
        data.cheapest = false;
      }
      data.id = `${type}-${index}`;
    });
  
    return finalData;
  }
  export function sort(items, value) {
    if (value == "COST") {
      items.sort(function(a, b) {
        return a.price - b.price;
      });
    } else {
      items.sort(function(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }
    return items;
  }
  function calculateRange(data) {
    var lowest = Number.POSITIVE_INFINITY;
    var highest = Number.NEGATIVE_INFINITY;
    var tmp;
    for (var i = data.length - 1; i >= 0; i--) {
      tmp = data[i].price;
      if (tmp < lowest) lowest = tmp;
      if (tmp > highest) highest = tmp;
    }
    return lowest;
  }
  
  export function filterData(data, filters) {
    var lowest = Number.POSITIVE_INFINITY;
    var highest = Number.NEGATIVE_INFINITY;
    var tmp;
    for (var i = data.length - 1; i >= 0; i--) {
      tmp = data[i].price;
      if (tmp < lowest) lowest = tmp;
      if (tmp > highest) highest = tmp;
    }
    if (filters.direct) {
      data = data.filter((res) => {
        return res.direct;
      });
    }
    data = data.filter((res) => {
      if (filters.cost == "high") {
        return res.price === highest;
      } else if (filters.cost == "low") {
        return res.price === lowest;
      } else {
        return res;
      }
    });
    if (filters.sortVal) {
      data = sort(data, filters.sortVal);
    }
    if (filters.selected) {
      data.filter((val) => {
        if (val.id == filters.selected.id) {
          val.selected = true;
        } else {
          val.selected = false;
        }
      });
    }
    if (!filters.asc) {
      return data;
    } else {
      return data.reverse();
    }
}