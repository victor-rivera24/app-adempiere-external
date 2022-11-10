SELECT
  M_InOut_ID
  ,DocumentNo
  ,MovementDate
  ,C_BPartner_ID
FROM M_InOut 
WHERE
  C_Order_ID = $1
  AND DocStatus IN ('CO','CL')