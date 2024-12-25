export function SuccessResponse(status: number, message: string, data: {}) {
  return new Response(
    JSON.stringify({
      success: true,
      message: message,
      data: data,
    }),
    {
      status: status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
