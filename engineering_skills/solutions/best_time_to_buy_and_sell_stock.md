---
layout: page
title: Best Time To Buy And Sell Stock
mathjax: true
---

* [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
```python
class Solution:
    def maxProfit(self,prices):
        left = 0 # Buy
        right = 1 # Sell
        max_profit = 0
        while right < len(prices):
            profit = prices[right] - prices[left] # our current profit
            if prices[left] < prices[right]:
                max_profit = max(profit,max_profit)
            else:
                left = right
            right += 1
        return max_profit
```

#### Other
* [Engineering Skills](/engineering_skills)