---
layout: post
title: "Cursor Evaluation Rules"
categories: [code-editors]
tags: [cursor, ide, code-editor]
---

# Understanding Cursor Evaluation Rules: A Guide for AI Agent Developers

In the rapidly evolving world of AI agent frameworks, ensuring that your agents behave reliably and efficiently is paramount. One powerful mechanism for achieving this is through [Cursor evaluation rules](https://cursor.com/docs/context/rules). These rules, often implemented in systems like Quotient AI's Model Control Plane (MCP), provide a structured way to validate and steer AI agent actions, particularly when interacting with tools. In this blog post, we'll dive into what Cursor evaluation rules are, how they work, their practical applications, and illustrate with an example from Quotient AI's documentation. Whether you're building autonomous agents or fine-tuning existing ones, these rules can be a game-changer for robustness and performance.

## What Are Cursor Evaluation Rules?

Cursor evaluation rules are configurable guidelines stored in a dedicated directory (typically `.cursor/rules/`) within an AI project's filesystem. They are written in a markdown-like format (with extensions like `.mdc`) and serve as enforceable policies for AI agents. The primary goal is to automatically evaluate and validate specific behaviors, such as tool usage, after certain triggers occur.

These rules draw from frameworks like Quotient AI's MCP, which emphasizes "steering" AI models to align with desired outcomes. They ensure consistency, catch errors early, and provide feedback loops for improvement. Key features include:

- **Metadata for Automation**: Rules can include flags like `alwaysApply: true` to make them trigger automatically in relevant scenarios.
- **Human-Readable Format**: Using markdown makes them accessible for developers and non-technical stakeholders alike.
- **Integration with Agent Workflows**: They hook into the agent's lifecycle, often post-action (e.g., after a tool call), to perform validations.

For more details on the foundational concepts, check out the official Quotient AI documentation on steering and MCP: [Quotient AI MCP Docs](https://docs.quotientai.co/steering/quotient-mcp).

## How Do Cursor Evaluation Rules Work?

At their core, Cursor evaluation rules operate as a post-processing layer in an AI agent's decision-making pipeline. Here's a breakdown of the mechanics:

1. **Rule Structure**:
   - **Header/Metadata**: A YAML-like block at the top (e.g., `--- alwaysApply: true ---`) defines properties like automatic application.
   - **Critical Rule Section**: Outlines the core directive, such as mandating a specific function call for validation.
   - **Application Scenarios**: Lists when the rule should kick in, like after tool calls or during performance reviews.
   - **Examples**: Provides usage snippets to guide implementation.

2. **Triggering and Execution**:
   - Rules are triggered based on events in the agent's workflow. For instance, with `alwaysApply: true`, the rule activates automatically after every qualifying action.
   - They often invoke helper functions (e.g., `evaluate_tool_call`) that take inputs like available tools and conversation history to assess correctness.
   - Validation checks include parameter accuracy, tool selection, and alignment with expected patterns.

3. **Feedback and Logging**:
   - Results from evaluations can be logged for debugging, fed into metrics for performance tracking, or used to halt erroneous actions.
   - This creates a feedback loop, allowing developers to refine agent logic iteratively.

In essence, these rules act as guardrails, preventing common pitfalls like invalid tool parameters or misuse of resources. They're particularly useful in complex environments where agents handle multiple tools, as they enforce standardization without constant manual oversight.

## Practical Applications of Cursor Evaluation Rules

Cursor evaluation rules shine in real-world AI development scenarios. Here are some key ways they can be used:

- **Tool Usage Validation**: Ensure agents call tools with correct parameters, reducing runtime errors.
- **Debugging Agent Behavior**: Automatically flag issues in tool interactions for quick troubleshooting.
- **Performance Optimization**: Track metrics like tool success rates to benchmark and improve agents over time.
- **Compliance and Security**: Enforce rules that check for adherence to policies, such as data privacy or ethical guidelines.
- **Custom Extensibility**: Developers can create tailored rules for domain-specific needs, like validating outputs in a customer support bot.

By integrating these rules, teams can build more reliable AI systems. For hands-on guidance, refer to Quotient AI's steering documentation, which includes templates and best practices: [Quotient AI Steering Guide](https://docs.quotientai.co/steering).

## Illustrating with the Quotient AI Example

To make this concrete, let's look at an example extracted from Quotient AI's MCP documentation. This rule, added to `.cursor/rules/evaluate-tool-call.mdc`, focuses on evaluating tool calls to ensure proper usage:

```markdown
---
alwaysApply: true
---
# Evaluate Tool Calls Rule

## Critical Rule

- Always use the `evaluate_tool_call` function after any agent tool call to evaluate proper usage of the tool
- Use this function to validate that tools are being called correctly with proper parameters
- Apply this evaluation when assessing agent performance or troubleshooting tool usage issues

## When to Apply

- After Any Tool Call
- When reviewing agent conversations that involve tool calls
- When validating that an AI agent correctly used available tools
- When checking if tool parameters were set correctly
- When assessing overall agent tool calling performance

## Example Usage

<example>
When evaluating if an agent correctly used tools, always call:
evaluate_tool_call(available_tools, message_history)

This ensures proper validation of tool usage patterns and parameter correctness.
</example>
```

In this setup:
- The `alwaysApply: true` ensures the rule triggers post-tool-call without manual invocation.
- The `evaluate_tool_call` function is called with parameters like `available_tools` (a list of tools) and `message_history` (contextual data).
- This validates aspects like parameter correctness and tool appropriateness.

Imagine an AI agent using a search tool: After the call, this rule checks if the query was well-formed and relevant. If not, it logs an error, helping developers refine the agent. This example highlights how rules provide a scalable way to maintain quality in agent-tool interactions.

For the full context and more examples, visit the source: [Quotient AI MCP Extract](https://docs.quotientai.co/steering/quotient-mcp).
