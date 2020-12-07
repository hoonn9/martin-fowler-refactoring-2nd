const createStatementData = (invoice, plays) => {
    const playFor = (aPerformance) => plays[aPerformance.playID];

    const amountFor = (aPerformance) => {
        let result = 0;

        switch (aPerformance.play.type) {
            case 'tragedy':
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case 'comedy':
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 1000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;

            default:
                throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
        }

        return result;
    };

    const volumeCreditFor = (aPerformance) => {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        // comedy 3명 마다 추가 포인트
        if ('comedy' === aPerformance.play.type) {
            result += Math.floor(aPerformance.audience / 5);
        }
        return result;
    };
    const enrichPerformance = (aPerformance) => {
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditFor(result);

        return result;
    };
    const totalVolumeCredits = (data) => data.performances.reduce((total, p) => total + p.volumeCredits, 0);

    const totalAmount = (data) => data.performances.reduce((total, p) => total + p.amount, 0);

    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    return statementData;
};

export default createStatementData;