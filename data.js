const annualData = {
    // https://www.slickcharts.com/sp500/returns
    // https://inflationdata.com/inflation/inflation_rate/historicalinflation.aspx
    1926: { stockReturns: 0.1162, inflationRate: 0.0094 },
    1927: { stockReturns: 0.3749, inflationRate: -0.0192 },
    1928: { stockReturns: 0.4361, inflationRate: -0.0115 },
    1929: { stockReturns: -0.0842, inflationRate: 0.0000 },
    1930: { stockReturns: -0.2490, inflationRate: -0.0266 },
    1931: { stockReturns: -0.4334, inflationRate: -0.0894 },
    1932: { stockReturns: -0.0819, inflationRate: -0.1030 },
    1933: { stockReturns: 0.5399, inflationRate: -0.0509 },
    1934: { stockReturns: -0.0144, inflationRate: 0.0351 },
    1935: { stockReturns: 0.4767, inflationRate: 0.0256 },
    1936: { stockReturns: 0.3392, inflationRate: 0.0104 },
    1937: { stockReturns: -0.3503, inflationRate: 0.0373 },
    1938: { stockReturns: 0.3112, inflationRate: -0.0201 },
    1939: { stockReturns: -0.0041, inflationRate: -0.0130 },
    1940: { stockReturns: -0.0978, inflationRate: 0.0073 },
    1941: { stockReturns: -0.1159, inflationRate: 0.0511 },
    1942: { stockReturns: 0.2034, inflationRate: 0.1097 },
    1943: { stockReturns: 0.2590, inflationRate: 0.0600 },
    1944: { stockReturns: 0.1975, inflationRate: 0.0164 },
    1945: { stockReturns: 0.3644, inflationRate: 0.0227 },
    1946: { stockReturns: -0.0807, inflationRate: 0.0843 },
    1947: { stockReturns: 0.0571, inflationRate: 0.1465 },
    1948: { stockReturns: 0.0550, inflationRate: 0.0774 },
    1949: { stockReturns: 0.1879, inflationRate: -0.0095 },
    1950: { stockReturns: 0.3171, inflationRate: 0.0109 },
    1951: { stockReturns: 0.2402, inflationRate: 0.0788 },
    1952: { stockReturns: 0.1837, inflationRate: 0.0229 },
    1953: { stockReturns: -0.0099, inflationRate: 0.0082 },
    1954: { stockReturns: 0.5262, inflationRate: 0.0032 },
    1955: { stockReturns: 0.3156, inflationRate: -0.0028 },
    1956: { stockReturns: 0.0656, inflationRate: 0.0152 },
    1957: { stockReturns: -0.1078, inflationRate: 0.0334 },
    1958: { stockReturns: 0.4336, inflationRate: 0.0273 },
    1959: { stockReturns: 0.1196, inflationRate: 0.0101 },
    1960: { stockReturns: 0.0047, inflationRate: 0.0146 },
    1961: { stockReturns: 0.2689, inflationRate: 0.0107 },
    1962: { stockReturns: -0.0873, inflationRate: 0.0120 },
    1963: { stockReturns: 0.2280, inflationRate: 0.0124 },
    1964: { stockReturns: 0.1648, inflationRate: 0.0128 },
    1965: { stockReturns: 0.1245, inflationRate: 0.0159 },
    1966: { stockReturns: -0.1006, inflationRate: 0.0301 },
    1967: { stockReturns: 0.2398, inflationRate: 0.0278 },
    1968: { stockReturns: 0.1106, inflationRate: 0.0427 },
    1969: { stockReturns: -0.0850, inflationRate: 0.0546 },
    1970: { stockReturns: 0.0401, inflationRate: 0.0584 },
    1971: { stockReturns: 0.1431, inflationRate: 0.0430 },
    1972: { stockReturns: 0.1898, inflationRate: 0.0327 },
    1973: { stockReturns: -0.1466, inflationRate: 0.0616 },
    1974: { stockReturns: -0.2647, inflationRate: 0.1103 },
    1975: { stockReturns: 0.3720, inflationRate: 0.0920 },
    1976: { stockReturns: 0.2384, inflationRate: 0.0575 },
    1977: { stockReturns: -0.0718, inflationRate: 0.0650 },
    1978: { stockReturns: 0.0656, inflationRate: 0.0762 },
    1979: { stockReturns: 0.1844, inflationRate: 0.1122 },
    1980: { stockReturns: 0.3242, inflationRate: 0.1358 },
    1981: { stockReturns: -0.0491, inflationRate: 0.1035 },
    1982: { stockReturns: 0.2155, inflationRate: 0.0616 },
    1983: { stockReturns: 0.2256, inflationRate: 0.0322 },
    1984: { stockReturns: 0.0627, inflationRate: 0.0430 },
    1985: { stockReturns: 0.3173, inflationRate: 0.0355 },
    1986: { stockReturns: 0.1867, inflationRate: 0.0191 },
    1987: { stockReturns: 0.0525, inflationRate: 0.0366 },
    1988: { stockReturns: 0.1661, inflationRate: 0.0408 },
    1989: { stockReturns: 0.3169, inflationRate: 0.0483 },
    1990: { stockReturns: -0.0310, inflationRate: 0.0539 },
    1991: { stockReturns: 0.3047, inflationRate: 0.0425 },
    1992: { stockReturns: 0.0762, inflationRate: 0.0303 },
    1993: { stockReturns: 0.1008, inflationRate: 0.0296 },
    1994: { stockReturns: 0.0132, inflationRate: 0.0261 },
    1995: { stockReturns: 0.3758, inflationRate: 0.0281 },
    1996: { stockReturns: 0.2296, inflationRate: 0.0293 },
    1997: { stockReturns: 0.3336, inflationRate: 0.0234 },
    1998: { stockReturns: 0.2858, inflationRate: 0.0155 },
    1999: { stockReturns: 0.2104, inflationRate: 0.0219 },
    2000: { stockReturns: -0.0910, inflationRate: 0.0338 },
    2001: { stockReturns: -0.1189, inflationRate: 0.0283 },
    2002: { stockReturns: -0.2210, inflationRate: 0.0159 },
    2003: { stockReturns: 0.2868, inflationRate: 0.0227 },
    2004: { stockReturns: 0.1088, inflationRate: 0.0268 },
    2005: { stockReturns: 0.0491, inflationRate: 0.0339 },
    2006: { stockReturns: 0.1579, inflationRate: 0.0324 },
    2007: { stockReturns: 0.0549, inflationRate: 0.0285 },
    2008: { stockReturns: -0.3700, inflationRate: 0.0385 },
    2009: { stockReturns: 0.2646, inflationRate: -0.0034 },
    2010: { stockReturns: 0.1506, inflationRate: 0.0164 },
    2011: { stockReturns: 0.0211, inflationRate: 0.0316 },
    2012: { stockReturns: 0.1600, inflationRate: 0.0207 },
    2013: { stockReturns: 0.3239, inflationRate: 0.0147 },
    2014: { stockReturns: 0.1369, inflationRate: 0.0162 },
    2015: { stockReturns: 0.0138, inflationRate: 0.0012 },
    2016: { stockReturns: 0.1196, inflationRate: 0.0126 },
    2017: { stockReturns: 0.2183, inflationRate: 0.0213 },
    2018: { stockReturns: -0.0438, inflationRate: 0.0244 },
    2019: { stockReturns: 0.3149, inflationRate: 0.0181 },
    2020: { stockReturns: 0.1840, inflationRate: 0.0124 },
}
